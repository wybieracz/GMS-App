import { Column, Dropdown, Grid } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { weekDays } from '../../consts/weekDays';
import DeleteButton from '../DeleteButton/DeleteButton';
import { ifHourIncorrect } from '../DeviceMode/DeviceModeUtils';

function handleRemove(id, rules, setRules) {
  rules.splice(id, 1);
  setRules(rules);
}

const AutoModeRule = ({ id, rules, setRules }) => {

  const [day, setDay] = useState(weekDays[rules[id][0]]);
  const [hStart, setHStart] = useState(rules[id][1]);
  const [mStart, setMStart] = useState(rules[id][2]);
  const [hEnd, setHEnd] = useState(rules[id][3]);
  const [mEnd, setMEnd] = useState(rules[id][4]);

  useEffect(() => {
    rules[id] = [day.id, hStart, mStart, hEnd, mEnd];
    setRules(rules)
  }, [day, hStart, mStart, hEnd, mEnd])

  return (
    <Grid>
      <Column lg={2} md={6} sm={4} className='device-mode__input'>
        <Dropdown
          ariaLabel="Dropdown"
          id="dropdown-auto-mode"
          label=""
          items={weekDays}
          titleText="Day"
          selectedItem={day}
          itemToString={(item) => (item ? item.name : '')}
          onChange={e => setDay(e.selectedItem)}
        />
      </Column>
      <Column lg={3} md={6} sm={4} className='device-mode__input'>
        <div style={{display: "flex"}}>
          <Dropdown
            style={{width: "50%"}}
            ariaLabel="Dropdown"
            id="dropdown-start-hours"
            label={hStart > 9 ? `${hStart}` : `0${hStart}`}
            className='auto-mode-rule__hour'
            items={[...Array(24).keys()]}
            titleText="Start hour"
            selectedItem={hStart}
            itemToString={e => (e > 9 ? `${e}` : `0${e}`)}
            onChange={e => setHStart(e.selectedItem)}
          />
          <Dropdown
            style={{width: "50%"}}
            ariaLabel="Dropdown"
            id="dropdown-start-minutes"
            label={mStart > 5 ? `${mStart}` : `0${mStart}`}
            className='auto-mode-rule__minute'
            items={[...Array(12)].map((_, i) => i * 5)}
            titleText="Start minute"
            selectedItem={mStart}
            itemToString={e => (e > 5 ? `${e}` : `0${e}`)}
            onChange={e => setMStart(e.selectedItem)}
          />
        </div>
      </Column>
      <Column lg={3} md={6} sm={4} className='device-mode__input'>
        <div style={{display: "flex"}}>
          <Dropdown
            style={{width: "50%"}}
            ariaLabel="Dropdown"
            id="dropdown-end-hours"
            label={hEnd > 9 ? `${hEnd}` : `0${hEnd}`}
            className='auto-mode-rule__hour'
            items={[...Array(24).keys()]}
            titleText="End hour"
            selectedItem={hEnd}
            itemToString={e => (e > 9 ? `${e}` : `0${e}`)}
            onChange={e => setHEnd(e.selectedItem)}
            invalid={ifHourIncorrect([day.id, hStart, mStart, hEnd, mEnd])}
          />
          <Dropdown
            style={{width: "50%"}}
            ariaLabel="Dropdown"
            id="dropdown-end-minutes"
            label={mEnd > 5 ? `${mEnd}` : `0${mEnd}`}
            className='auto-mode-rule__minute'
            items={[...Array(12)].map((_, i) => i * 5)}
            titleText="End minute"
            selectedItem={mEnd}
            itemToString={e => (e > 5 ? `${e}` : `0${e}`)}
            onChange={e => setMEnd(e.selectedItem)}
            invalid={ifHourIncorrect([day.id, hStart, mStart, hEnd, mEnd])}
          />
        </div>
      </Column>
      <Column lg={3} md={6} sm={4} className='device-mode__input'>
      { rules.length > 1
        ? <div className='auto-mode-rule__remove'>
            <DeleteButton onClick={() => handleRemove(id, rules, setRules)} />
          </div>
        : null
      }
      </Column>
    </Grid>
  )
}

export default AutoModeRule