import { bindActionCreators } from 'redux';



const actionsOptions = {

  inputLimit(payload) {
    return {
      type: 'INPUT_LIMIT',
      payload
    }
  },

  inputOffset(payload) {
    return {
      type: 'INPUT_OFFSET',
      payload
    }
  },

  inputOrderBy(payload) {
    return {
      type: 'INPUT_ORDER_BY',
      payload
    }
  },

  inputAscDesc(payload) {
    return {
      type: 'INPUT_ASC_DESC',
      payload
    }
  },

  addCondition(payload) {
    return {
      type: 'ADD_CONDITION',
      payload
    }
  },

  clearCondition() {
    return {
      type: 'CLEAR_CONDITION',
    }
  },

  inputConditionType(payload) {
    return {
      type: 'INPUT_CONDITION_TYPE',
      payload
    }
  },

  inputConditionDataType(payload) {
    return {
      type: 'INPUT_CONDITION_DATA_TYPE',
      payload
    }
  },

  inputConditionValue(payload) {
    return {
      type: 'INPUT_CONDITION_VALUE',
      payload
    }
  },

  selectConditionColumn(payload) {
    return {
      type: 'SELECT_CONDITION_COLUMN',
      payload
    }
  },

  clearOptions() {
    return {
      type: 'CLEAR_OPTIONS',
    }
  },
}


const actionsBase = {

  fetchTables(payload) {
    return {
      type: 'FETCH_TABLES',
      payload
    }
  },


  setCurrentTable(payload) {
    return {
      type: 'SET_CURRENT_TABLE',
      payload
    }
  },


  fetchCurrentTableColumns(payload) {
    return {
      type: 'FETCH_CURRENT_TABLE_COLUMNS',
      payload
    }
  },


  fetchCurrentTableContent(payload) {
    return {
      type: 'FETCH_CURRENT_TABLE_CONTENT',
      payload
    }
  },

  inputNewValueEditTableCell(payload) {
    return {
      type: 'INPUT_NEW_VALUE_EDIT_TABLE_CELL',
      payload
    }
  },

  inputConditionsEditTableCell(payload) {
    return {
      type: 'INPUT_CONDITIONS_EDIT_TABLE_CELL',
      payload
    }
  },

  inputColumnNameEditTableCell(payload) {
    return {
      type: 'INPUT_COLUMN_NAME_EDIT_TABLE_CELL',
      payload
    }
  }
}




export const actions = (dispatch) => {

  const actionsDispatched = () => {
    return {
      ...bindActionCreators(actionsBase, dispatch),
      ...bindActionCreators(actionsOptions, dispatch)
    };
  };


  return actionsDispatched();
}


    // case 'SET_CURRENT_TABLE': {
    //   return {
    //     ...state,
    //     currentTable: action.payload,
    //   }
    // }
    // case 'FETCH_CURRENT_TABLE_CONTENT': {
    //   return {
    //     ...state,
    //     currentTableContent: action.payload,
    //   }
    // }