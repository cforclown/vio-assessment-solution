export interface ISidebarItem {
  id: string;
  label: string;
  path?: string;
  items?: ISidebarItem[];
}

export const sidebarItems: ISidebarItem[] = [
  {
    id: 'services',
    label: 'Services',
    path: '/services',
  }
];