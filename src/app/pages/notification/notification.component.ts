import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CryptoService } from '../../service/crypto.service';
import { ForgeService } from '../../service/forge.service';
import { CommonModule } from '@angular/common';
 


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',

})
export class NotificationComponent {
  notifiction = [
    "Contract has been issued for the property “3BHK Villa, Al Murabba.” 6359 King Faisal Road, Al Murabba, Riyadh 12613.",
    "Your rent request for the property “4BHK Gated community, Al Khalij.” 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approved. ",
    "Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.the property “2BHK, Al Zahraa.” has been rejectedthe property “2BHK, Al Zahraa.” has been rejected",
    "Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.",
    "Your ren j.” 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approved. ",
    "Contract has been issued for the property “2BHK Apartment, Al Murabba.” 6359 King Faisal Road, Al Murabba, Riyadh 12613.",
    "Contract has been issued for the property “3BHK Villa, Al Murabba.” 6359 King Faisal Road, Al Murabba, Riyadh 12613.",
    "Your 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approvedYour 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approvedYour 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approvedYour 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approvedYour 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approvedYour 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approvedYour 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approved. ",
    "Your 99 King Faisal Road,  ",
    "Your 99 King Faisal Road, Al Khalij, Riyadh 12613, has been approved. Faisal Road, Al Khalij, Riyadh 12613, has been approved. Faisal Road, Al Khalij, Riyadh 12613, has been approved. Faisal Road, Al Khalij, Riyadh 12613, has been approved. Faisal Road, Al Khalij, Riyadh 12613, has been approved. Faisal Road, Al Khalij, Riyadh 12613, has been approved. ",
    "Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.Your Property approval for the property “2BHK, Al Zahraa.” has been rejected.",
  ];




}
