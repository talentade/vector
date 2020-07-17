import Dir1 from "../themes/images/tradeDashboard/dir1.svg";
import Dir2 from "../themes/images/tradeDashboard/dir2.svg";
import Dir3 from "../themes/images/tradeDashboard/dir3.svg";
import Lnav2 from "../themes/images/tradeDashboard/l_nav2.svg";
import Lnav3 from "../themes/images/tradeDashboard/l_nav3.svg";
import Lnav4 from "../themes/images/tradeDashboard/mkt.svg";
import Lnav5 from "../themes/images/tradeDashboard/l_nav5.svg";
import Lnav6 from "../themes/images/tradeDashboard/l_nav6.svg";


import Menu1 from "../themes/images/admin/menu1.png";
import Menu2 from "../themes/images/admin/menu2.png";
import Menu3 from "../themes/images/admin/menu3.png";
import Menu4 from "../themes/images/admin/menu4.png";
import Menu5 from "../themes/images/admin/menu5.png";
import Menu6 from "../themes/images/admin/menu6.png";
import Menu7 from "../themes/images/admin/menu7.png";
import Menu8 from "../themes/images/admin/menu8.png";
import Menu9 from "../themes/images/admin/menu9.png";
import Menu10 from "../themes/images/admin/menu10.png";

export const favouritePairs = [
  {
    pair: "BTC/USD",
    direction: Dir1,
    price: "$9.807",
  },
  {
    pair: "BTC/USD",
    direction: Dir1,
    price: "$9.807",
  },
  {
    pair: "BTC/USD",
    direction: Dir1,
    price: "$9.807",
  },
  {
    pair: "BTC/USD",
    direction: Dir1,
    price: "$9.807",
  },
  {
    pair: "BTC/USD",
    direction: Dir2,
    price: "$9.807",
  },
  {
    pair: "BTC/USD",
    direction: Dir3,
    price: "$9.807",
  },
];

export const balanceItemData = [
  {
    className: "credit",
    heading: "Credit",
    figure: "$0.00",
  },
  {
    className: "open",
    heading: "Open P/L",
    figure: "-$2,370.00",
  },
  {
    className: "equity",
    heading: "Equity",
    figure: "-$2,370.00",
  },
];

export const marginData = [
  {
    margin: "Margin",
    price: "$679.50",
  },
  {
    margin: "Free Margin",
    price: "$103,207.55",
  },
  {
    margin: "M. Level",
    price: "-$2,370.00",
  },
];

export const theaderDataClosed = [
  "INSTRUMENT",
  "TYPE",
  "TIME",
  "ORDER PRICE",
  "ORDER RATE",
  "S/L",
  "T/P",
  "CLOSE RATE",
  "CLOSE PRICE",
  "DETAILS",
];

export const tbodyDataClosed = [
  {
    instrument: "AUD/USD",
    type: "Forex",
    time: "24-Mar-2020 12:29pm",
    orderPiece: "$3.21",
    orderRate: "0.3245",
    sl: "-",
    tp: "-",
    closeRate: "0.3245",
    closePrice: "$3.42",
    details: "Sell",
  },
  {
    instrument: "AUD/USD",
    type: "Forex",
    time: "24-Mar-2020 12:29pm",
    orderPiece: "$3.21",
    orderRate: "0.3245",
    sl: "-",
    tp: "-",
    closeRate: "0.3245",
    closePrice: "$3.42",
    details: "Buy",
  },
];

export const theaderDataOpen = [
  "INSTRUMENT",
  "TYPE",
  "TIME",
  "ORDER PRICE",
  "ORDER RATE",
  "S/L",
  "T/P",
  "CURRENT RATE",
  "PROFIT",
  "DETAILS",
  "ACTION",
];

export const tbodyDataOpen = [
  {
    instrument: "AUD/USD",
    type: "Forex",
    time: "24-Mar-2020 12:29pm",
    orderPiece: "$3.21",
    orderRate: "0.3245",
    sl: "-",
    tp: "-",
    currentRate: "0.3245",
    profit: "$3.42",
    details: "Sell",
    action: "Close",
  },
  {
    instrument: "AUD/USD",
    type: "Forex",
    time: "24-Mar-2020 12:29pm",
    orderPiece: "$3.21",
    orderRate: "0.3245",
    sl: "-",
    tp: "-",
    currentRate: "0.3245",
    profit: "$3.42",
    details: "Sell",
    action: "Close",
  },
];

export const userData = [
  {
    dataKey: "Name",
    value: "Solaru Olusegun",
  },
  {
    dataKey: "User ID",
    value: "T834104",
  },
  {
    dataKey: "Email",
    value: "segunsolaru@gmail.com",
    editable: true,
  },
  {
    dataKey: "Phone",
    value: "+2349031900410",
    editable: true,
  },
  {
    dataKey: "Phone",
    value: "Ukraine",
  },
];

export const passwordBoxInfo = [
  {
    labelName: "Current Password",
    placeholder: "Enter your current password",
    name: 'oldPassword',
  },
  {
    labelName: "New Password",
    placeholder: "Enter your new password",
    name: 'newPassword'
  },
  {
    labelName: "Confirm Password",
    placeholder: "Confirm your new password",
    name: 'confirmPassword'
  },
];

export const unverifiedData = [
  "Upload Proof of Identity",
  "Upload Proof of Address",
  "Verify Email Address",
];

export const verificationData = [
  {
    itemHead: 'Upload Proof of Identity', 
    itemContent: 'Upload ID Card or Passport',
    buttonText: 'Upload',
    verified: true,
  },
  {
    itemHead: 'Upload Proof of Residence', 
    itemContent: 'Utility Bill or Bank statement',
    buttonText: 'Upload',
    verified: true,
  },
  {
    itemHead: 'Upload Declaration of Deposit', 
    itemContent: 'Document declaring deposit in account',
    buttonText: 'Upload',
    verified: true,
  },
  {
    itemHead: 'Upload Credit and Debit Card', 
    itemContent: 'Upload front and back image of debit and credit card',
    buttonText: 'Upload'
  },
  {
    itemHead: 'Email Verification', 
    itemContent: 'Verify segunsolaru@gmai.com',
    buttonText: 'Request Verification'
  }
]

export const debitCardInfo = [
  {
    cardNumber: '5743   5783   2921   4920',
    expiryDate: '09/20',
    color: "#03CF9E",
  }, {
    cardNumber: '5743   5783   2921   4920',
    expiryDate: '09/20',
    color: "#C624FF",
  }
]

export const leftNavData = [
  {
    path: '/Trade',
    className: 'l-nav-link',
    imageUrl: Lnav2,
    name: 'trade',
    text: 'Trade'
  },
  {
    path: '/Accounts',
    className: 'l-nav-link',
    imageUrl: Lnav3,
    text: 'Trading Account',
  },
  {
    path: '/Market',
    className: 'l-nav-link',
    imageUrl: Lnav4,
    text: 'Market'
  },
  {
    path: '/News',
    className: 'l-nav-link',
    imageUrl: Lnav5,
    text: 'News'
  },
  {
    path: '/Transactions',
    className: 'l-nav-link',
    imageUrl: Lnav6,
    name: 'transactions',
    text: 'Transactions'
  }
]

const appNavClass = 'l-nav-link';

export const adminLeftNavData = [
  {path: '/Forms', className: appNavClass, imageUrl: Menu1, name: 'forms', text: 'Forms'},
  {path: '/Lists', className: appNavClass, imageUrl: Menu2, name: 'lists', text: 'Lists'},
  {path: '/MailAccounts', className: appNavClass, imageUrl: Menu3, name: 'mailaccounts', text: 'Mail Accounts'},
  {path: '/TeamSettings', className: appNavClass, imageUrl: Menu4, name: 'teamsettings', text: 'Team Settings'},
  {path: '/Unsubscribers', className: appNavClass, imageUrl: Menu5, name: 'unsubscribers', text: 'Unsubscribers'},
  {path: '/Campaigns', className: appNavClass, imageUrl: Menu6, name: 'campaigns', text: 'Campaigns'},
  {path: '/Instruments', className: appNavClass, imageUrl: Menu7, name: 'instruments', text: 'Instruments'},
  {path: '/Documents', className: appNavClass, imageUrl: Menu8, name: 'documents', text: 'Documents'},
  {path: '/News', className: appNavClass, imageUrl: Menu9, name: 'news', text: 'News'},
  {path: '/Restrictions', className: appNavClass, imageUrl: Menu10, name: 'restrictions', text: 'Restrictions'}
]

export const TopNavData = [
  {

  }
]

export const instrumentsData = [
  'EURGPY',
  'GBPJPY',
  'GBPCHF',
  'EURAUD',
  'EURCAD',
  'CHFJPY',
  'GBPAUD',
  'AUDJPY',
  'CADCHF',
  'AUDCAD',
  'USDDKK',
  'AUDCHF',
  'AUDNZD',
  'EURNZD',
  'GBPNZD',
  'NZDCAD',
  'NZDCHF',
  'NZDJPY',
  'USDSGD',
  'USDNOK',
  'EURSEK',
  'USDHKD',
  'USDHUF',
  'EURHUF',
  'HKDJPY',
  'USDCZK',
  'USDZAR',
  'EURMXN',
  'USDMXN',
  'USDTRY',
  'EURTRY',
  'NOKSEK',
  'USDRUB',
  'NOKJPY'
]

export const tHistory = [
  {
    type: 'DEPOSIT',
    date: '24-03-2020',
    to: '77899-ID1437843 USD 320, 000',
    amount: '100, 000 USD',
    status: 'Completed',
  },
  {
    type: 'WITHDRAWAL',
    date: '24-03-2020',
    to: '77899-ID1437843 USD 320, 000',
    amount: '100, 000 USD',
    status: 'Completed',
  },
  {

  }
]