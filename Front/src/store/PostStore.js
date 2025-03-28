import {defineStore} from "pinia"
import axiosInstance from "@/lib/axios.js"
import {ref} from "vue"
import router from "@/router"
import {useToast} from "vue-toast-notification";
export const usePostStore = defineStore('postStore', () => {
    const $toast = useToast();
    const post = ref(null)
    const posts = ref({})

    const errors = ref('')
    const processing = ref(false)
    const getPosts = async (page= 1) => {
        try {
            processing.value = true
            const {data} = await axiosInstance.get(`/api/posts?page=${page}`)
            posts.value = data
        } catch (e) {
            if (e.response?.status === 422){
                errors.value = e.response.data.errors
            }
        } finally {
            processing.value = false
        }
    }

    const store = async (payload) => {
        try {
            processing.value = true
            await axiosInstance.post('/api/posts', payload)
            router.push('/posts')
            $toast.success('Post successfully stored!')
        } catch (e) {
            if (e.response?.status === 422){
                errors.value = e.response.data.errors
            }
        } finally {
            processing.value = false
        }
    }

    const getPost = async (id) => {
        try {
            const {data} = await axiosInstance.get(`/api/posts/${id}`)
            post.value = data.data
        } catch (e) {
            if (e.response?.status === 422){
                errors.value = e.response.data.errors
            }
        }
    }

    const update = async (id, payload) => {
        try {
            processing.value = true
            await axiosInstance.put(`/api/posts/${id}`, payload)
            router.push('/posts')
            $toast.success('Post successfully updated!')
        } catch (e) {
            if (e.response?.status === 422){
                errors.value = e.response.data.errors
            }
        } finally {
            processing.value = false
        }
    }

    return {
        errors,
        processing,
        posts,
        post,
        getPosts,
        store,
        getPost,
        update
    }
})