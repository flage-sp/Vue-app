
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useuserstore = defineStore(
    'big-user',
    () => {
        const token = ref('')
        const settoken = (newtoken)  =>{
            token.value = newtoken
        }
        const removetoken = ()  =>{
            token.value = ''
        }
        const from = ref({})
        const setfrom = (newfrom)  =>{
            from.value = newfrom
        }
        const removefrom = ()  =>{
            from.value = ''
        }
        const loading = ref(false)
        const removeloading = (lod)  =>{
            loading.value = lod
        }
        const currentPage = ref(1)
        const pageSize = ref(2)
        const page = (newld) =>{
            pageSize.value = newld
        }
        const pages = (newld) =>{
            currentPage.value = newld
        }
        const dropbox = ref('')
        const dest = (newess) =>{
            dropbox.value = newess
        }
        const dests = () =>{
            dropbox.value = ''
        }
        const imgbox = ref('')
        const imgadd = (imgg) =>{
            const img = URL.createObjectURL(imgg.raw)
            imgbox.value = img
        }
        const imgeff = () =>{
            imgbox.value = ''
        }
        //用户基本资料
        const userprofile = ref({
                old_pwd: '',
                new_pwd: '',
                re_pwd: ''
                })
        const adduserprofile = (obj) =>{
            userprofile.value = obj
        }
        const reduceuserprofile = () =>{
            userprofile.value = ''
        }
        //用户个人信息
        const files = ref('')
        const addres = (obj) =>{
            files.value = obj
        }
        const prosit = () =>{
            files.value = ''
        }
        const fileser = ref('/ArticleManage')
        const addreser = (obj) =>{
            fileser.value = obj
        }
        const prositer = () =>{
            fileser.value = ''
        }
        return {
        settoken,
        removetoken,
        token,  
        setfrom ,
        removefrom ,
        from,
        removeloading,
        loading,
        page,
        currentPage,
        pageSize,
        pages,
        dest,
        dropbox,
        dests,
        imgeff,
        imgadd,
        imgbox,
        userprofile,
        adduserprofile,
        reduceuserprofile,
        files,
        addres,
        prosit,
        fileser,
        addreser,
        prositer
        }
    },{
        persist: {
            paths: ['token', 'from', 'loading', 'currentPage', 'pageSize', 'imgbox', 'userprofile', 'files', 'fileser']
        }
    }
)