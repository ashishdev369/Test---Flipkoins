import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Pyramid() {
    function generatePyramid() {
        var totalNumberofRows = 5;
        var output = '';

    }
    // reset login status
    var t;
    var totalNumberofRows = 8;
    var initialValue = 2;
    var output = '';
    var pyramidRows = [];
    var lastRowValues = [];
    var currentRowValues = [];
    pyramidRows = Array(totalNumberofRows).fill(1).map((x, i) => (i));

    return (
        <div className="col-lg-12">
            <h2>Pyramid</h2>
            <form name="form">
                <div className="col-lg-12">
                    {/* {(() => {
                        return (<div>
                            {(() => {
                                for (let i = 1; i <= totalNumberofRows; i++) {
                                    let space = "";
                                    let value = "";
                                    {
                                        return (<div>
                                            {(() => {
                                                for (let space1 = 0; space1 <= totalNumberofRows - i; space1++) {
                                                    space = space + "   ";
                                                }
                                                for (let j = 1; j <= i * 2 - 1; j++) {
                                                    value = value + " "+i+" ";
                                                }
                                                return (<pre>{space + value}<br/></pre>)
                                            })()}
                                        </div>)
                                    }
                                }
                            })()}
                        </div>)
                    })()} */}
                    {
                        pyramidRows.map((i, row) => {
                            if (i > 0) {
                                let space = "    ".repeat(totalNumberofRows - (i + 1));
                                let value = 2;
                                output = space;
                                lastRowValues.length = 0;
                                let m = 0;
                                while(m <= currentRowValues.length){
                                    if(currentRowValues[m]){
                                        lastRowValues.push(currentRowValues[m])
                                    }
                                    m++;
                                }
                                currentRowValues = [];
                                currentRowValues = Array(i);
                                for (let j = 1; j <= i; j++) {
                                    if (i == 1 && j == 1) {
                                        output = output + "     " + value + "  ";;
                                    } else {
                                        if (j == 1) {
                                            let firstValue = ((initialValue * 2) + (((i-1) * 2) - 1));
                                            initialValue = value = firstValue;
                                            value = "  " + value + "  ";
                                            output = output +  "  " + value + "  ";;
                                        } else {
                                            if(i==2 && j==2){
                                                value = 9;
                                                output = output +  "  " + value + "  ";;
                                            }else{
                                                value = parseInt(value) + lastRowValues[j-2];
                                                output = output +  "  " + value + "  ";;
                                            }
                                        }
                                    }
                                    currentRowValues.push(parseInt(value));
                                }
                                return (<pre>{output}</pre>);
                            }
                        })
                    }


                </div>
            </form>
        </div>
    );
}

export { Pyramid };


