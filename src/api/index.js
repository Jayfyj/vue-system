import {instance} from '@/utils/request';


export const fetchData = (body) =>instance.get('/server/table',{ params: body })


