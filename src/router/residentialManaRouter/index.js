import { PageView } from '@/layouts'

const residentialRouter = {
  path: '/residentialMana',
  name: 'residentialMana',
  component: PageView,
  redirect: '/residentialMana',
  meta: { title: '居住管理', icon: 'table', permission: [ 'table' ] },
  children: [
    {
      path: '/residentialMana/index',
      name: 'roomMana',
      hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      component: () => import('@/views/residentialMana/index'),
      meta: { title: '房型管理', keepAlive: true, permission: [ 'table' ] }
    },
    {
      path: '/residentialMana/addEditRoom',
      name: 'addEditRoom',
      hidden: true,
      component: () => import('@/views/residentialMana/addEditRoom'),
      beforeEnter: (to, form, next) => {
        if (to.query.parm === 'add') {
          to.meta.title = '新增房型'
          to.meta.permission = [ 'table' ]
        } else if (to.query.parm === 'edit') {
          to.meta.title = '编辑房型'
          to.meta.permission = [ 'table' ]
        }
        next()
      }
    },
    {
      path: '/residentialMana/roomSet',
      name: 'RoomSet',
      hideChildrenInMenu: true,
      component: () => import('@/views/residentialMana/roomSet'),
      meta: { title: '房间设置', keepAlive: true, permission: [ 'table' ] }
    },
    {
      path: '/residentialMana/dictionary',
      name: 'Dictionary',
      hideChildrenInMenu: true,
      component: () => import('@/views/residentialMana/dictionary'),
      meta: { title: '字典维护', keepAlive: true, permission: [ 'table' ] }
    }
  ]
}

export default residentialRouter
