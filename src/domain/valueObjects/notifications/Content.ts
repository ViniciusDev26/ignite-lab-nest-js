export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isValid = this.validateContentLength(content);
    if (!isValid) throw new Error('Content length error');

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    const size = content.length;
    return size >= 5 && size <= 40;
  }
}
