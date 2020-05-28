import React, { useEffect } from 'react';
import './styles/viewer.sass';
import { connect } from 'react-redux';
import { selectCodeData } from '../../store/selectors';
import { Parser } from '../../services/parser';
import _ from 'lodash';
import {ObjectInspector, TableInspector} from 'react-inspector';
const Viewer = ({
    codeData,
}) => {
    const renderExpressions = () => {
        try {
            const parsedCode = Parser.parse(codeData);
            console.log('parsedCode', parsedCode)
            const formattedExpressions = _.mapValues(parsedCode, expression => {
                const result = eval(expression);
                console.log(result);
                if (result && result.type) {
                  return {result};
                } else if (_.isFunction(result) && result.name) {
                  return {
                      result: result,
                      type: 'function',
                    };
                } else if (_.isBoolean(result)) {
                  return {
                      result: result ? 'true' : 'false',
                      type: 'boolean',
                  }
                } else if(_.isString(result)){
                    return {
                        result,
                        type: 'string'
                    }
                } else if(_.isNumber(result)){
                    return {
                        result,
                        type: 'number'
                    }
                } else if (_.isObject(result) || _.isArray(result)) {
                  return {
                      type: 'object',
                      result
                    };
                }
                
                return result;
              });
              console.log(formattedExpressions);
              return _.map(formattedExpressions, (expression, line) =>
                expression && expression.result ? 
                    <div className={"log-item"}>
                        <ObjectInspector data={expression.result} />
                    </div> : null
              );
        } catch(err) {
            return <div className={'log-item err'}>{err.toString()}</div>
        }
    }
    return (
        <div className="viewer">
            {renderExpressions()}
        </div>
    )
};

const mapStateToProps = state => ({
    codeData: selectCodeData(state),
});

export default connect(
    mapStateToProps,
)(Viewer);

