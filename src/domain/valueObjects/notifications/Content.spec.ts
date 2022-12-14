import { Content } from './content';

describe('Notification content', () => {
  it('should throw error if content size is less than five characters', () => {
    expect(() => new Content('tiny')).toThrow('Content length error');
  });

  it('should throw error if content size is more than forty characters', () => {
    expect(() => new Content('longMessage'.repeat(4))).toThrow(
      'Content length error',
    );
  });

  it('should to be able to create a new content', () => {
    const content = new Content('any valid content message');

    expect(content).toBeInstanceOf(Content);
    expect(content.value).toBe('any valid content message');
  });
});
