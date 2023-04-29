import {configureStore} from '@reduxjs/toolkit'
import todoSlicer from './todoSlicer'
import showModalSlicer from './showModalSlicer'
import EditMode from './EditMode'
export const store = configureStore({
    reducer:{
     todos:todoSlicer,
     showModal:showModalSlicer,
     editable:EditMode,
    }
})