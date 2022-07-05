import React from 'react';
// import {Rnd} from 'react-rnd';
import s from './DashboardCanvas.module.scss';
import GridLayout from 'react-grid-layout';

function DashboardCanvas() {
    const layout = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2},
        {i: 'b', x: 1, y: 0, w: 3, h: 2},
        {i: 'c', x: 4, y: 0, w: 1, h: 2},
    ];
    return (
        <div className={s.wrapper}>
            <div className={s.tile__wrapper}>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
                <div className={s.tile__row}>
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                    <div className={s.canvas__tile} />
                </div>
            </div>
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={30}
                width={1200}>
                <div key="a">a</div>
                <div key="b">b</div>
                <div key="c">c</div>
            </GridLayout>
        </div>
    );
}

export default DashboardCanvas;
