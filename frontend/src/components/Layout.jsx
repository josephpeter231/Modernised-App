import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
function Layout() {
    return (
        <div>
            <div className='mt-20 flex flex-col md:flex-row md:justify-between'>
                
                
                <div className='ml-[426px] task-container w-au mx-5 md:w-1/3 mt-3 items-center'>
                <div className='indicator'>
                        <TaskIndicator />
                    </div>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default Layout;