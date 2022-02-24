import {instance} from '@/utils/request';


export const menuUrl = (body) =>instance.get('/server/menu',{ params: body })




