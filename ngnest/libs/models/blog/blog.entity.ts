import { User, Photo } from '@authdare/models';
import { BaseEntity } from '@authdare/core';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  JoinTable,
  OneToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Blog extends BaseEntity<Blog> {
  @Column({ length: 50 }) title: string;

  @OneToMany(() => BlogContent, (blogContent) => blogContent.blog, {
    eager: true,
    cascade: true,
  })
  contents: BlogContent[];

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  author: User;
}

@Entity()
export class BlogContent extends BaseEntity<BlogContent> {
  @Column() title: string;
  @Column() content: string;

  @Column() order: number;

  @ManyToOne(() => Blog, (blog) => blog.contents)
  @JoinColumn()
  blog: Blog;

  @ManyToMany(() => Photo, (photo) => photo.id, { eager: true, cascade: true })
  @JoinTable({ name: 'content_photo' })
  photos: Photo[];
}
