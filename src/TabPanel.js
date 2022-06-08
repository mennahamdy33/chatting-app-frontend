import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chat from "./chat";




export default function VerticalTabs() {
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }
    const [userIds,setUserIds] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [currentUser,setCurrentUser] = React.useState("");
    

    function onPress(event, newValue) {
        setValue(newValue);
        
        setCurrentUser(newValue);
        console.log(newValue)
      }
    return (
        <>
        
            <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={onPress}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1,borderLeft: 1, borderColor: 'divider' }}
            >
 {userIds.map((id)=>{
          
          return    <Tab label={id.name} value={id.id} {...a11yProps(id.id)} />
 
        
        })}

               
              
            </Tabs>
          
           <Chat currentUser={currentUser} setUserIds={setUserIds} userIds={userIds} />
          </>
    );
}
