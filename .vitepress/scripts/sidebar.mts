import { type DefaultTheme } from 'vitepress';
import pluginlist from './pluginlist.json';

export default [
  {
    text: 'Tiddlers',
    collapsed: false,
    items: pluginlist,
  },
] as DefaultTheme.Config['sidebar'];
