export interface IUser {
  id: number;
  name: string;  //отчество и фамилия??
  username: string;  //имя?? (странный там нейминг в фейк-апи)
  email?: string;  
  address?: {
    street?: string;  
    suite?: string;  
    city: string;
    zipcode?: string;  
    geo?: {
      lat?: string;  
      lng?: string;  
    };
  };
  phone?: string;  
  website?: string;  
  company: {
    name: string;
    catchPhrase?: string;  
    bs?: string;  
  };
  comment?: string;  //кастомное новое поле
}

