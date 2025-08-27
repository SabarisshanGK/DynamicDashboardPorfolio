// import { useQuery } from "@tanstack/react-query"
// import axios from "axios";

// export const useFinanceData = (sector: string) => {

//     const query = useQuery({
//         queryKey: ["financeDatas",sector],
//         queryFn: async({queryKey}) => {
//             const [ _key, sectorParam ] = queryKey;
//             const response = await axios.get(`${process.env.BASE_URL}/api/stock/`,{params: {sector: sectorParam}})
//             return response.data
//         },
//         enabled: !!sector,
//     })

//     return query;

// }