import { Button } from "@/components/ui/button";
import { 
    ChartColumnDecreasing, 
    ChartPie,
    CircleX, 
    Clock3, 
    Download,
    LogIn, 
    NotepadText,
    Pen 
} from "lucide-react";
import { ReactNode } from "react";
//@ts-ignore
import SemiCircleProgressBar from "react-progressbar-semicircle";
import google from '../../../assets/google.png'
import { ICampaign } from "@/components/context/types/schemes";
import { Checkbox } from "@/components/ui/checkbox";
import styles from './Table.module.css';
import NameIcon from '../../../assets/svg-icon/name.svg';

export interface AppTableCampaignsProps {
    data: ICampaign[],
    itemRender?: (item: ICampaign) => ReactNode,
    headersRender?: (item: any) => ReactNode
}

export default function AppTableCampaigns(props: AppTableCampaignsProps) {
    const {data, itemRender, headersRender} = props;

    return (
        headersRender?.('') ||
        <div className="app-table-wrapper">
            <div className="headers-table hidden md:ml-auto md:flex flex flex-wrap justify-between items-center mb-3">
                    <div className={` ${styles.TabName} name-header flex items-center gap-2`}>
                      <img src={NameIcon} style={{ width: '18px', height: '18px'}} /> 
                      Name
                    </div>
                    <div className="other-headers flex items-center justify-between gap-16">
                        <div className="page-status flex items-center gap-5">
                            <div className="page flex items-center gap-2 text-1xl">
                            <NotepadText style={{ width: '18px', height: '18px'}} />
                            Page
                            </div>
                            <div className="status flex items-center gap-2 text-1xl">
                            <ChartPie style={{ width: '18px', height: '18px'}}/>
                            Status
                            </div>
                        </div>
                        <div className="last-updated flex items-center gap-2 text-1xl">
                        <Clock3 style={{ width: '18px', height: '18px'}} />
                            Last updated
                        </div>
                        <div className="passed flex items-center gap-2 text-1xl">
                        <LogIn style={{ width: '18px', height: '18px'}}/>
                            Pass
                        </div>
                    </div>
            </div>
            <div className="data-table gap-3 items-center">
                {data.map(item => {
                    const passed = Math.floor((item.passed / item.total) * 100)
                    return (
                        itemRender?.(item) ||
                        <div className="flex items-center gap-2 mb-5 container">
                            <Checkbox 
                              className="hidden md:ml-auto md:flex" 
                              value={item.id}
                            />
                            <div className="campaign-info container flex flex-wrap items-center gap-2 justify-between p-5 rounded-lg bg-card">
                                <div className="name flex flex-col items-start gap-1">
                                    <span className="md:hidden gray-text">Name</span>
                                    {item.name}
                                </div>
                                <div className="other-info flex  items-center flex-wrap justify-between gap-10">
                                    <div className="flex  items-center gap-5">

                                        <div className="page flex flex-col items-start gap-1">
                                          <span className="md:hidden gray-text">Page</span>
                                          <img width={32} height={32} src={google.src} />
                                        </div>

                                        <div className="status flex flex-col items-start gap-1 min-w-24">
                                            <span className="md:hidden gray-text">Status</span>
                                            <Button className="w-[100%] min-w-[200px]" variant={item.status >= 1 ? 'success' : 'customDestructive'}>
                                                {item.status >= 1 ? "Active" : "Deactivated"}
                                            </Button>
                                        </div>

                                    </div>
                                    <div className="last-updated-passed flex items-center justify-center gap-5">

                                        <div className="last-updated flex flex-col items-start gap-1">
                                           <span className="md:hidden gray-text">Last updated</span>
                                            {item.last_updated}
                                        </div>

                                        <div className="passed flex  flex-col font-medium items-center justify-center">
                                        <span className="md:hidden gray-text">Pass</span>
                                        <SemiCircleProgressBar 
                                            diameter={70} 
                                            strokeWidth={3} 
                                            percentage={passed} 
                                            showPercentValue 
                                            stroke={passed >= 50 ? '#27AE60' : '#E64800'}
                                        />
                                            <span>passed</span>
                                        </div>
                                    </div>
                                 <div className="actions-md flex md:hidden items-center flex-wrap gap-3">
                                    <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <Download />
                                    Code
                                    </a>
                                </Button>
                                <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <ChartColumnDecreasing />
                                    Stats
                                    </a>
                                </Button>
                                <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <Pen />
                                    Edit
                                    </a>
                                </Button>
                                <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <CircleX />
                                    Delete
                                    </a>
                                </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex actions items-center justify-center gap-2 hidden md:ml-auto md:flex">
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <Download />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <ChartColumnDecreasing />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <Pen />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <CircleX />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}