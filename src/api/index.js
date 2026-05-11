import add from '@/utils/request'
export const register = ( { username, password, repassword } ) => {
    return add.post('/api/reg',{ username, password, repassword } )
}

export const login = ( { username, password } ) => {
    return add.post('/api/login',{ username, password} )
}

export const chebian = () => {
    return add.get('/my/menus', )
}

export const textacquisition = ()=> {
    return add.get('/my/cate/list', )
}

export const edies = ( obj )=> {
    return add.put('/my/cate/info', 
        { id: obj.id, cate_name: obj.cate_name, cate_alias: obj.cate_alias},
     )
}

export const addedies = ( obj )=> {
    return add.post('/my/cate/add', 
        {  cate_name: obj.cate_name, cate_alias: obj.cate_alias },
     )
}

export const artDelChannelService = (id) =>
  add.delete('/my/cate/del', {
    params: { id }
  })

export const artDel = ( pagenum, pagesize, cate_id, state ) =>
    add.get('/my/article/list',{ params: { pagenum, pagesize , cate_id, state } } )

export const addarticle = (data) => ( add.post('/my/article/add',  data) )

export const huoqv = (id) => ( add.get('/my/article/info',  {params: {id}}) )

export const bianji = (data) => add.put('/my/article/info', data) 

export const deletetext = (id) => add.delete('/my/article/info', {params:{id}}) 

export const touxiang = (avatar) => add.patch('/my/update/avatar', {avatar})

export const modify = ({old_pwd, new_pwd, re_pwd}) => add.patch('/my/updatepwd', {old_pwd, new_pwd, re_pwd})

export const huqu = () =>add.get('/my/userinfo')

export const gengxin = (data) =>add.put('/my/userinfo', data)