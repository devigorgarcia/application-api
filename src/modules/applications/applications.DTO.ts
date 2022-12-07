export class CreateApplicationDTO {
  title: string;
  org: string;
  link: string;
  obs: string;
  status: string;
  level: string;
  stack: string;
}

export class UpdateApplicationDTO {
  link?: string;
  obs?: string;
}
