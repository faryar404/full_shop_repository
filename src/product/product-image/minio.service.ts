import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class MinioService {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.config.getOrThrow<string>('MINIO_BUCKET');
    this.publicUrl = this.config.getOrThrow<string>('MINIO_PUBLIC_URL');

    this.client = new S3Client({
      endpoint: this.config.getOrThrow<string>('MINIO_ENDPOINT'), // e.g. http://localhost:9000
      region:   this.config.get<string>('MINIO_REGION', 'us-east-1'),
      credentials: {
        accessKeyId:     this.config.getOrThrow<string>('MINIO_ACCESS_KEY'),
        secretAccessKey: this.config.getOrThrow<string>('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true, // الزامی برای MinIO
    });
  }

  /**
   * آپلود فایل به MinIO
   * @returns public URL تصویر
   */
  async upload(file: Express.Multer.File): Promise<string> {
    const ext      = extname(file.originalname).toLowerCase();
    const key      = `product-images/${randomUUID()}${ext}`;

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket:      this.bucket,
          Key:         key,
          Body:        file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to upload image to MinIO: ${(err as Error).message}`,
      );
    }

    return `${this.publicUrl}/${this.bucket}/${key}`;
  }

  /**
   * حذف فایل از MinIO با استفاده از URL ذخیره‌شده
   */
  async delete(fileUrl: string): Promise<void> {
    // key رو از URL استخراج می‌کنیم
    const key = this.extractKey(fileUrl);
    if (!key) return;

    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key:    key,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to delete image from MinIO: ${(err as Error).message}`,
      );
    }
  }

  private extractKey(fileUrl: string): string | null {
    try {
      const url    = new URL(fileUrl);
      // path شامل /bucket/key است، bucket رو حذف می‌کنیم
      const parts  = url.pathname.split('/').filter(Boolean);
      // parts[0] = bucket name → بقیه = key
      return parts.slice(1).join('/');
    } catch {
      return null;
    }
  }
}
