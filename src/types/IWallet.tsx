export interface IWallet {
  address: string;                  
  balance: number;                  
  currencies_balance: Record<string, number>; // Балансы для каждой валюты
  last_activity: number;             
  status: string;                    
  interfaces: string[];              
  name?: string;                     // Имя кошелька (если доступно)
  is_scam: boolean;                  
  icon?: string;                   
  memo_required: boolean;            // Требуется ли memo при переводах
  get_methods: string[];          
  is_suspended: boolean;            
  is_wallet: boolean;                
}