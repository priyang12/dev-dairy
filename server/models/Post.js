class PostSchema {
  constructor(user, text, likes, dislike, comments, date, title) {
    this.user = user;
    this.text = text;
    this.title = title;
    this.likes = likes;
    this.dislike = dislike;
    this.comments = comments;
    this.date = date;
  }
}

module.exports = PostSchema;
