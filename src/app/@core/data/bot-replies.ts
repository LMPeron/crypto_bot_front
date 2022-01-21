export const botAvatar = {
  name: 'LBOT',
  avatar: 'https://i.gifer.com/no.gif',
};
export const gifsLinks: string[] = [
  'https://media.tenor.com/images/ac287fd06319e47b1533737662d5bfe8/tenor.gif',
  'https://i.gifer.com/no.gif',
  'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
  'http://www.reactiongifs.com/r/wnd1.gif',
];
export const imageLinks: string[] = [
  'https://picsum.photos/320/240/?image=357',
  'https://picsum.photos/320/240/?image=556',
  'https://picsum.photos/320/240/?image=339',
  'https://picsum.photos/320/240/?image=387',
  'https://picsum.photos/320/240/?image=30',
  'https://picsum.photos/320/240/?image=271',
];
const fileLink = 'http://google.com';

export const botReplies = [
  {
    regExp: /([H,h]ey)|([H,h]i)/g,
    answerArray: ['Hello!', 'Yes?', 'Yes, milord?', 'What can I do for you?'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([H,h]elp)/g,
    answerArray: [
      `No problem! Try sending a message containing word "hey", "image",
    "gif", "file", "map", "quote", "file group" to see different message components`,
    ],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([I,i]mage)|(IMAGE)|([P,p]ic)|(Picture)/g,
    answerArray: ['Hey look at this!', 'Ready to work', 'Yes, master.'],
    type: 'pic',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: '',
          type: 'image/jpeg',
        },
      ],
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([G,g]if)|(GIF)/g,
    type: 'gif',
    answerArray: ['No problem', 'Well done', 'You got it man'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: '',
          type: 'image/gif',
        },
      ],
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([F,f]ile group)|(FILE)/g,
    type: 'group',
    answerArray: ['Take it!', 'Job Done.', 'As you wish'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: fileLink,
          icon: 'file-text-outline',
        },
        {
          url: '',
          type: 'image/gif',
        },
        {
          url: '',
          type: 'image/jpeg',
        },
      ],
      icon: 'file-text-outline',
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([F,f]ile)|(FILE)/g,
    type: 'file',
    answerArray: ['Take it!', 'Job Done.', 'As you wish'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: fileLink,
          icon: 'file-text-outline',
        },
      ],
      icon: 'file-text-outline',
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([M,m]ap)|(MAP)/g,
    type: 'map',
    answerArray: ['Done.', 'My sight is yours.', 'I shall be your eyes.'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'map',
      latitude: 53.914321,
      longitude: 27.5998355,
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([Q,q]uote)|(QUOTE)/g,
    type: 'quote',
    answerArray: ['Quoted!', 'Say no more.', 'I gladly obey.'],
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      type: 'quote',
      quote: '',
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
  {
    regExp: /([R,r]eportar)|(REPORTAR)/g,
    type: 'reportar',
    answerArray: ['Aguarde um momento...'],
    reply: {
      report: true,
      text: '',
      reply: false,
      date: new Date(),
      type: 'quote',
      quote: '',
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },

  {
    regExp: /(.*)/g,
    answerArray: [
      'Caso esta mensagem que acabou de enviar seja a descrição do problema digite REPORTAR!, Se não me escreva brevemente o seu problema e logo após digite REPORTAR.',
    ],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: botAvatar.name,
        avatar: botAvatar.avatar,
      },
    },
  },
];
