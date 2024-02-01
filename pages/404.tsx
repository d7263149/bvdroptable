import { NextPage } from 'next'
import { Text, Flex, Box } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

const IndexPage: NextPage = () => {

let chainURL = 'https://api.reservoir.tools/collections/activity/v6?collection=0x86ecdc01c4a06a35e69659488c70546a06713ae4&types=sale&types=mint&limit=20&sortBy=eventTimestamp';


const Duration = (difference: number) => {
    let secondsInMiliseconds    = 1000, 
        minutesInMiliseconds    = 60 * secondsInMiliseconds,
        hoursInMiliseconds      = 60 * minutesInMiliseconds;

    var differenceInHours       = difference / hoursInMiliseconds,
         differenceInMinutes    = differenceInHours     % 1 * 60,
         differenceInSeconds    = differenceInMinutes   % 1 * 60;
    return {
        "hours"   : Math.floor(differenceInHours),
        "minutes" : Math.floor(differenceInMinutes),
        "seconds" : Math.floor(differenceInSeconds)
    }
}
// let aLittleWhileAgo = (new Date()-10000000)


// console.log('test start and start');
// console.log(Duration(now-aLittleWhileAgo))

// console.log('test start and end');

const updatemint = async (address: any,chain: any,url: any) =>{
console.log('innerfunction start')
// console.log('address',address)
// console.log('chain',chain)
// console.log('url',url)

const apiUrl = chainURL;




//  console.log('datatop', data?.[0]);

// let now = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
 let now:any = new Date().valueOf();

let forto:any = 1703912699*1000;
console.log('timestamp', forto);
console.log('now', now);
if(forto){
// let aLittleWhileAgo = (now - 1703859419)
// console.log('aLittleWhileAgo',aLittleWhileAgo);
let diff = now-forto
let temphour = Duration(diff);
console.log('diff',diff);
var hours = Math.abs(diff) / 36e5;


console.log('temphour', temphour)
console.log('hours', hours)



}
  
const date1 = new Date(now);
const date2 = new Date(forto);

console.log('dat1',date1)
console.log('dat2',date2)


console.log('innerfunction end')
}




updatemint("0x86ecdc01c4a06a35e69659488c70546a06713ae4",1,"https://api.reservoir.tools/collections/activity/v6?collection=0x86ecdc01c4a06a35e69659488c70546a06713ae4&types=sale&types=mint&limit=20&sortBy=eventTimestamp")









  return (
    <Layout>
      <Flex
        direction="column"
        align="center"
        css={{ py: '200px', px: '$3', textAlign: 'center' }}
      >
        <Box css={{ color: '$gray11', mb: '30px' }}>
          <FontAwesomeIcon icon={faFolderOpen} size="2xl" />
        </Box>
        <Text style="body1" color="subtle" css={{ mb: '$1' }}>
          404 Error.
        </Text>
        <Text style="body1" color="subtle">
          The requested URL was  not found on the server.
        </Text>
      </Flex>
    </Layout>
  )
}

export default IndexPage
