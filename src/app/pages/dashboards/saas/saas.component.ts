import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';

import { earningLineChart, salesAnalyticsDonutChart } from './data';
import { ChartType, ChatMessage } from './saas.model';
import { ConfigService } from '../../../core/services/config.service';
import { fetchchatdata } from 'src/app/store/Chat/chat.action';
import { selectData } from 'src/app/store/Chat/chat-selector';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-saas',
  templateUrl: './saas.component.html',
  styleUrls: ['./saas.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,CommonModule,ReactiveFormsModule,SimplebarAngularModule,TabsModule,NgApexchartsModule]
})
/**
 * Saas-dashboard component
 */
export class SaasComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollRef') scrollRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  earningLineChart: ChartType;
  salesAnalyticsDonutChart: ChartType;
  ChatData: ChatMessage[];
  sassEarning: any;
  sassTopSelling: any;
  formData: UntypedFormGroup;

  // Form submit
  chatSubmit: boolean;

  constructor(public formBuilder: UntypedFormBuilder, private configService: ConfigService, public store: Store) { }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];

    this.store.dispatch(fetchchatdata());
    this.store.select(selectData).subscribe(data => {
      this.ChatData = data;
    })
    this._fetchData();

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.configService.getConfig().subscribe(response => {
      this.sassEarning = response.sassEarning;
      this.sassTopSelling = response.sassTopSelling;
    });
  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message').value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.ChatData.push({
        align: 'right',
        name: 'Henry Wells',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });
      this.onListScroll();
      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null
      });
    }

    this.chatSubmit = true;
  }

  private _fetchData() {
    this.earningLineChart = earningLineChart;
    this.salesAnalyticsDonutChart = salesAnalyticsDonutChart;
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 500;
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  selectMonth(value: any) {
    let data = value.target.value
    switch (data) {
      case "january":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 35, 20, 41, 51, 42, 49, 45, 58, 42, 75, 48],
              },
            ],
          },
        ];
        break;
      case "december":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 28, 31, 34, 40, 52, 29, 45, 68, 60, 47, 12],
              },
            ],
          },
        ];
        break;
      case "november":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2887.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$684.04",
            series: [
              {
                name: "series1",
                data: [28, 30, 48, 50, 47, 40, 35, 48, 56, 42, 65, 41],
              },
            ],
          },
        ];
        break;
      case "october":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2100.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$674.04",
            series: [
              {
                name: "series1",
                data: [28, 48, 39, 47, 48, 41, 28, 46, 25, 32, 24, 28],
              },
            ],
          },
        ];
        break;
    }
  }

  sellingProduct(event) {
    let month = event.target.value;
    switch (month) {
      case "january":
        this.sassTopSelling = [
          {
            title: "Product B",
            amount: "$ 7842",
            revenue: "0.4",
            list: [
              {
                name: "Product D",
                text: "Neque quis est",
                sales: 41,
                chartVariant: "#34c38f"
              },
              {
                name: "Product E",
                text: "Quis autem iure",
                sales: 14,
                chartVariant: "#556ee6"
              },
              {
                name: "Product F",
                text: "Sed aliquam mauris.",
                sales: 85,
                chartVariant: "#f46a6a"
              },
            ],
          },
        ];
        break;
      case "december":
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#556ee6"
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#f46a6a"
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#34c38f"
              },
            ],
          },
        ];
        break;
      case "november":
        this.sassTopSelling = [
          {
            title: "Product C",
            amount: "$ 4745",
            revenue: "0.8",
            list: [
              {
                name: "Product G",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#34c38f"
              },
              {
                name: "Product H",
                text: "Quis autem iure",
                sales: 42,
                chartVariant: "#556ee6"
              },
              {
                name: "Product I",
                text: "Sed aliquam mauris.",
                sales: 63,
                chartVariant: "#f46a6a"
              },
            ],
          },
        ];
        break;
      case "october":
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#f46a6a"
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#556ee6"
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#34c38f"
              },
            ],
          },
        ];
        break;
      default:
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#556ee6"
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#34c38f"
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#f46a6a"
              }
            ]
          }
        ];
        break;
    }
  }

}
