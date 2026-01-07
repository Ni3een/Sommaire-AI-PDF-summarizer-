import { isDev } from "./helpers";

 export const pricingplans=[
    {
        name:'Basic',
        price:7,
        items:['5 pdf summaries per month',
            'Standard Processing Speed',
            'Email support'

        ],
        id:'basic',
        paymentLink:isDev?'https://buy.stripe.com/test_28E4gr9in36FgMbaq19ws00':'https://buy.stripe.com/test_bJe28j66bcHf3Zp9lX9ws02',
        priceId:isDev?'price_1Sk7Fg0poVQ7BJbFZzgeduIN':'price_1Sn26R0poVQ7BJbFu5JZjHUf',
        description:'Perfect for casual use.'
    },{
        name:'PRO',
        price:10,
        items:['Unlimited pdf summaries per month',
            'Fast Processing Speed',
            '24/7Priority support',
            'Access to new features',
            'Markdown Export'],
            id:'pro',
            paymentLink:isDev?'https://buy.stripe.com/test_bJeeV5bqvePn2Vl55H9ws01':'https://buy.stripe.com/test_4gM3cncuzaz7anN8hT9ws03',
            priceId:isDev?'price_1Sk7Gy0poVQ7BJbFtEpOvV31':'price_1Sn27O0poVQ7BJbFqk02IdZ3',
            description:'For Professionals and Teams'
    }
]


export const containerVariants={
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{
            staggerChildren:0.2,
            delayChildren:0.1,
        },
    },
}

export const itemsVariants={
    hidden:{opacity:0,y:20},
    visible:{
        opacity:1,
        transition:{
            type:'spring' as const,
            damping:15,
            stiffness:50,
            duration:0.5,
        }
    }
}
export const titleVariants={
    hidden:{opacity:0,y:20},
    visible:{
        opacity:1,
        transition:{
            type:'spring' as const,
            damping:15,
            stiffness:50,
            duration:0.5,
        }
    }
}