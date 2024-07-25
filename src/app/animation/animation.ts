import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';
import { state } from '@angular/animations';
export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
      ]),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);


export const animationsliderwidgetsright = [
  trigger(
    'slideView',
    [
      state('true', style({ transform: 'translateX(100%)', opacity: 0 })),
      state('false', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('0 => 1', animate('500ms', style({ transform: 'translateX(0)', 'opacity': 1 }))),
      transition('1 => 1', animate('500ms', style({ transform: 'translateX(100%)', 'opacity': 0 }))),
    ]),

  trigger('slideright', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('600ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
    ]),

    transition(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
      animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
    ])
  ])
]


export const animationsliderwidgetleft = [
  trigger('slideView', [
    state('true', style({ transform: 'translateX(-100%)', opacity: 0 })), // Changed to -100%
    state('false', style({ transform: 'translateX(0)', opacity: 1 })),
    transition(
      '0 => 1',
      animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
    ),
    transition(
      '1 => 1',
      animate('500ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ), // Changed to -100%
  ]),

  trigger('sliderleft', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }), // Changed to -100%
      animate(
        '600ms ease-in',
        style({ transform: 'translateX(0%)', opacity: 1 })
      ),
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
      animate(
        '0ms ease-in',
        style({ transform: 'translateX(-100%)', opacity: 0 })
      ), // Changed to -100%
    ]),
  ]),
]


export const opencloseanimation = [
  trigger('openClose', [
    state('open',
      style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })
    ),
    state('closed',
      style({
        height: '100px',
        width: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })
    ),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('1s')
    ]),
  ]),
  trigger('squreCircle', [
    state('squre',
      style({
        height: '100px',
        width: '100px',
        backgroundColor: 'yellow'
      })
    ),
    state('circle',
      style({
        height: '100px',
        width: '100px',
        backgroundColor: 'green',
        opacity: 0.5,
        borderRadius: '100px'
      })
    ),
    transition('squre <=> circle', [
      animate('1s')
    ]),
  ])
]

// <button (click)="toggle()">Change</button>

// <div [@squreCircle]="isSqure ? 'squre' : 'circle'" class="squre-circle-container">
//     <p>Change shape {{ isSqure ? 'Squre' : 'Circle' }}</p>
// </div>
// <div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
//     <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
// </div>
// toggle() {
//   this.isOpen = !this.isOpen;
//   this.isSqure = !this.isSqure;
// }