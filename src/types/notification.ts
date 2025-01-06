interface Notification {
  readonly id: number;
  readonly createdAt: string;
  readonly name: string;
  readonly image: string;
  readonly content: string;
  readonly link: string;
  readonly isRead: boolean;
}

export default Notification;
