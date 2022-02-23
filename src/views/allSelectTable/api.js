import {instance} from '@/utils/request';


export const tableData = (body) =>instance.get('/server/table',{ params: body })

export const table = (body) =>instance.get('/server/tabjson',{ params: body })



