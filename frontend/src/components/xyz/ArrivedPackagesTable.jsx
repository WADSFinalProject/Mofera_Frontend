import React, { useEffect, useState } from 'react';
import DataTable,{ createTheme } from 'react-data-table-component';
import { getArrivedPackage } from '../../../api/xyzAPI';

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
	{
		name: 'Package ID',
		selector: row => row.id,
        sortable: true,
        width: "220px",   
	},
	{
		name: 'Centra',
		selector: row => row.centra_id,
        sortable: true,
        width: "217px"   
	},
    {
		name: 'Weight',
		selector: row => row.weight,
        sortable: true,
        width: "180px"
	},
    {
		name: 'Receival Date',
		selector: row => row.received_date,
        sortable: true,
        width: "180px"   
	},
];

// const data = [
//     {
//         id: 'PKG#3439320',
//         Centra: 'Centra Unit 1',
//         Weight: 30,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#3493050',
//         Centra: 'Centra Unit 2',
//         Weight: 20,
//         Date: '31/08/2023',

//     },
//     {
//         id: 'PKG#05939539',
//         Centra: 'Centra Unit 2',
//         Weight: 40,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#29393293',
//         Centra: 'Centra Unit 2',
//         Weight: 15,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#5588538',
//         Centra: 'Centra Unit 2',
//         Weight: 10,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#70203929',
//         Centra: 'Centra Unit 2',
//         Weight: 20,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#93828423',
//         Centra: 'Centra Unit 2',
//         Weight: 17,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#79992392',
//         Centra: 'Centra Unit 2',
//         Weight: 28,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#79812392',
//         Centra: 'Centra Unit 1',
//         Weight: 15,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#62342392',
//         Centra: 'Centra Unit 1',
//         Weight: 12,
//         Date: '31/08/2023',
        
//     },
//     {
//         id: 'PKG#62344445',
//         Centra: 'Centra Unit 1',
//         Weight: 24,
//         Date: '31/08/2023',
        
//     }
// ]

// const customTheme = createTheme('custom', {
//     background: {
//         default: 'rgba(230,241,237,255)', 
//     },
//     divider: {
//         default: 'none', 
//     },
// });

function ArrivedPackagesTable() {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await getArrivedPackage(0)
            console.log(response.data)
            if(response && response.data) {
                setData(response.data)
            }
        }

        fetchData()
    }, [])
    return (
        <div className='bg-quinary px-4 pt-3 pb-4 rounded-lg flex-1 overflow'>
            <div className='relative'>
                <p className="text-xl text-left text-black font-medium ml-4 pt-6 mb-4">Package Status</p>
                <div>
                    <form className="w-40">
                        <select id="times" className="bg-quinary absolute top-0 right-0 border border-primary text-primary text-sm focus:ring-primary focus:border-primary block p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-full px-1 mr-28 mt-5">
                            <option>Select Centra</option>
                            <option>Centra 1</option>
                            <option>Centra 2</option>
                            <option>Centra 3</option>
                        </select>
                    </form>

                    <form className="w-40">
                        <select id="times" className="bg-quinary absolute top-0 right-0 border border-primary text-primary text-sm focus:ring-primary focus:border-primary block p-1 dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:primary dark:focus:border-primary rounded-full px-1 mr-4 mt-5">
                            <option>Filter</option>
                            <option>Date</option>
                            <option>Weight</option>
                        </select>
                    </form>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={data}
                pagination
                theme='custom'
                customStyles={{
                    table: {
                        style: {
                            backgroundColor: 'rgba(230,241,237,255)',
                        },
                    },
                    headCells: {
                        style: {
                            borderTop: '1px solid rgba(26,127,93,255)',
                            borderBottom: '1px solid rgba(26,127,93,255)',
                            color: '#000',
                            fontWeight: 'bold',
                        },
                    },
                }}
            />
        </div>
    );
};

export default ArrivedPackagesTable;
