export class Post {
  constructor(
    public id: number,
    public title: string,
    public created_at: string,
    public author: string,
    public content: string,
    public topicTitle: string = '',
    public comments: Comment[] = []
  ) {}

  getFormattedDate(): string {
    const date = new Date(this.created_at);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}