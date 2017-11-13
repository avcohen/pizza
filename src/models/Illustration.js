const mongoose = require('mongoose');

mongoose.promise = global.Promise;
const slug = require('slugs');

const illustrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Enter an illustration name.',
  },
  slug: String,
  description: {
    type: String,
  },
  img: { data: Buffer, type: String },
  created: {
    type: Date,
    default: Date.now,
  },
});

illustrationSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  // check for redundant slugs
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const illustrationWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (illustrationWithSlug.length) {
    this.slug = `${this.slug}-${illustrationWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Illustration', illustrationSchema);
