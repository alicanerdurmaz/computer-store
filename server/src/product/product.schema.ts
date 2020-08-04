import * as mongoose from 'mongoose';
import productFieldValues from './product.field-values.js';

export const productSchema = new mongoose.Schema({
  Model: {
    type: String,
    required: true,
    text: true,
  },
  Part: {
    type: String,
  },
  Seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

  'Screen Size': {
    type: String,
    required: true,
  },
  'Screen Panel Type': {
    type: String,
    enum: productFieldValues.screenPanelType,
    required: true,
  },
  Resolution: {
    type: String,
    enum: productFieldValues.resolution,
    required: true,
  },
  'Refresh Rate': {
    type: String,
    enum: productFieldValues.refreshRate,
    required: true,
  },
  Dimensions: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  Weight: {
    type: Number,
    required: true,
  },
  'CPU Core Count': {
    type: Number,
    enum: productFieldValues.cpuCoreCount,
    required: true,
  },
  'CPU Core Clock': {
    type: String,
    required: true,
  },
  'CPU Boost Clock': {
    type: String,
    required: true,
  },
  Memory: {
    type: Number,
    enum: productFieldValues.memory,
    required: true,
  },
  CPU: {
    type: String,
    required: true,
  },
  'CPU Microarchitecture': {
    type: String,
  },
  'SSD Storage': {
    type: String,
    required: true,
  },
  'SSD Type': {
    type: String,
    required: true,
  },
  Storage: {
    type: String,
    required: true,
  },
  GPU: {
    type: String,
    required: true,
  },
  'GPU Memory': {
    type: Number,
    enum: productFieldValues.memory,
    required: true,
  },
  'Operating System': {
    type: String,
    required: true,
  },
  'SD Card Reader': {
    type: String,
    lowercase: true,
    trim: true,
    enum: ['yes', 'no'],
  },
  'Front Facing Webcam': {
    type: String,
    required: true,
  },
  Images: {
    type: Array,
  },
  Name: {
    type: String,
    required: true,
    text: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Manufacturer: {
    type: String,
    trim: true,
    enum: productFieldValues.manufacturer,
    required: true,
  },
});

productSchema.index({ Name: 'text', Model: 'text' });
