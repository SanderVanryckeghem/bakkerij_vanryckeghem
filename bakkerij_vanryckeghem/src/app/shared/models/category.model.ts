export interface Category {
  title: string;
  description: string;
  icon?: string;
  routerLink: string;
  queryParams?: { [key: string]: string };
}
