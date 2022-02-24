import {instance} from '@/utils/request';


export const tableDataUrl = (body) =>instance.get('/server/table',{ params: body })

export const tabjsonUrl = (body) =>instance.get('/server/tabjson',{ params: body })



