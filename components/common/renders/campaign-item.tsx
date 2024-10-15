import { ChartColumnDecreasing, ChartNoAxesColumn, CircleX, Download, Pencil } from "lucide-react";
import { ICampaign } from "../../context/types/schemes";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
// @ts-ignore
import SemiCircleProgressBar from "react-progressbar-semicircle";
import google from '../../../assets/google.png'
import { ModalConfirm } from "@/components/controls/modals/modal-confirm";
import styles from './styles/campaing-item.module.css';


export default function CampaignItem
(
    item: ICampaign, 
    setSelected: (value: string) => any,
    selected: string,
    onClickRemoveCampaign: (id: number | string) => any
) {
    const passed = Math.floor((item.passed / item.total) * 100)
    return (
        <div className="flex items-center gap-2 mb-5">

            <Checkbox 
                className={`${styles.checkboxBtn} hidden md:ml-auto md:flex`} 
                value={item.id}
                onCheckedChange={e => e ? setSelected(item.id.toString()) : setSelected('')}
                checked={selected === item.id.toString()}
            />
            
            <div className="campaign-info w-full flex flex-wrap items-center gap-2 justify-between p-2 pl-5 pr-5 rounded-lg bg-card">
                <div className="name flex flex-col items-start gap-1">
                    <span className="md:hidden gray-text">Name</span>
                     {item.name}
                </div>
               
            
               <div className={`${styles.InfoBlock} other-info flex items-center flex-wrap justify-between gap-12`}>
                 <div className={`${styles.blockCntnt} flex  items-center gap-10`}>
                    <div className="page flex flex-col items-start gap-1">
                        <span className={`${styles.titleSize} md:hidden gray-text`}>Page</span>
                        <img width={32} height={32} src={google.src} />
                    </div>

                <div className="status flex flex-col items-start gap-1">
                    <span className={`${styles.titleSize} md:hidden gray-text`}>Status</span>
                        <Button className={`${styles.btnStatus}`} variant={item.status >= 1 ? 'success' : 'customDestructive'}>
                            {item.status >= 1 ? "Active" : "Deactivated"}
                        </Button>
                </div>
            </div>

            <div className={`${styles.blockCntnt} last-updated-passed flex items-center justify-center gap-10`}>
               <div className="last-updated flex flex-col items-start gap-1 text-sm">
                    <span className={`${styles.titleSize} md:hidden gray-text`}>Last updated</span>
                        <div className={styles.dataContainer}>
                            {item.last_updated}
                        </div>
                </div>
                <div className="passed flex  flex-col font-medium items-center justify-center">
                    <span className={`${styles.titleSize} md:hidden gray-text`}>Pass</span>
                        <SemiCircleProgressBar 
                            diameter={70} 
                            strokeWidth={3} 
                            percentage={passed} 
                            showPercentValue 
                            stroke={passed >= 50 ? '#27AE60' : '#E64800'}
                        />
                        <span style={{fontSize: '12px'}}>passed</span>
                </div>
                </div>
 
            
                <div className={` ${styles.gridBtn} actions-md flex md:hidden items-center flex-wrap gap-3`}>
                    <Button className="bg-background" variant={'secondary'}>
                       <a href={item.link} download className="flex items-center justify-center gap-2">
                       <Download />
                        Code
                       </a>
                    </Button>

                    <Button 
                        className="bg-background" 
                        variant={'secondary'}
                    >
                        <a href={`/client/stats-user/${item.id}`} className="flex items-center justify-center gap-2">
                        <ChartColumnDecreasing />
                        Stats
                        </a>
                    </Button>

                    <Button 
                        className="bg-background" 
                        variant={'secondary'}
                    >
                        <a href={`/client/update-campaign/${item.id}`} className="flex items-center justify-center gap-2">
                        <Pencil />
                        Edit
                        </a>
                    </Button>

                    <ModalConfirm 
                        title={`Delete campaign ${item.name}`}
                        description={`Delete campaign ${item.name} (ID ${item.id})? This action don't be cancel!`}
                        showDialogNameButton={   
                          <a className="flex items-center justify-center gap-2">
                          <CircleX />
                           Delete
                         </a>
                        }
                            cancelButtonName="Cancel"
                            confirmButtonName="Delete"
                            onClickCancel={() => console.log('cancel')}
                            onClickConfirm={() => onClickRemoveCampaign(item.id)}
                        />
                        </div>
                    </div>
                   </div>

                    <div className={`${selected === item.id.toString() ? 'flex md:ml-auto md:flex' : 'hidden'} actions items-center justify-center gap-2`}>
                       <Button className="bg-card" variant={'secondary'}>
                            <a href={item.link} download className='flex items-center justify-center gap-2'>
                            <Download style={{ width: '18px', height: '18px'}} />
                            Code
                            </a>
                        </Button>

                        <Button className="bg-card" variant={'secondary'}>
                            <a href={`/client/stats-user/${item.id}`} className='flex items-center justify-center gap-2'>
                            <ChartNoAxesColumn style={{ width: '18px', height: '18px'}} />
                            Stats
                        </a>
                        </Button>

                        <Button className="bg-card" variant={'secondary'}>
                            <a href={`/client/update-campaign/${item.id}`} className='flex items-center justify-center gap-2'>
                            <Pencil style={{ width: '20px', height: '20px', fill: 'white', color: '#2C3F4F'}} />
                            Edit
                            </a>
                        </Button>

                        <ModalConfirm 
                                title={`Delete campaign ${item.name}`}
                                description={`Delete campaign ${item.name} (ID ${item.id})? This action don't be cancel!`}
                                showDialogNameButton={
                                    
                                        <a className="flex items-center justify-center gap-2">
                                        <CircleX style={{ width: '18px', height: '18px', fill: 'white', color: '#2C3F4F'}} />
                                        Delete
                                         
                                        </a>
                                     }
                                cancelButtonName="Cancel"
                                confirmButtonName="Delete"
                                onClickCancel={() => console.log('cancel')}
                                onClickConfirm={() => onClickRemoveCampaign(item.id)}
                                classNameShowDialogButton="bg-card"
                                />
                            </div>
                     </div>
    )
}