export default interface Device {
  readonly memberId: number;
  readonly platform: 'WEB';
  readonly token: string;
  readonly status: boolean;
}
