class PostSchema {
  constructor(user, text, title, likes, comments, date) {
    this.user = user;
    this.text = text;
    this.title = title;
    this.likes = likes;
    this.comments = comments;
    this.date = date;
  }
}

module.exports = PostSchema;
