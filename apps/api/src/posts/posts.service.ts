import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

  async create(dto: CreatePostDto) {
    const doc = await this.postModel.create(dto);
    return doc.toObject();
  }

  async findAll() {
    const docs = await this.postModel.find().sort({ createdAt: -1 }).lean();
    return docs;
  }

  async findOne(id: string) {
    const doc = await this.postModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Post not found');
    return doc;
  }

  async update(id: string, dto: UpdatePostDto) {
    const doc = await this.postModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .lean();
    if (!doc) throw new NotFoundException('Post not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.postModel.findByIdAndDelete(id).lean();
    if (!doc) throw new NotFoundException('Post not found');
    return { deleted: true };
  }
}

