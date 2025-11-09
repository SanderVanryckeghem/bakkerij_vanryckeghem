export interface Category {
  title: string;
  description: string;
  routerLink: string;
  queryParams?: { [key: string]: string };
}
