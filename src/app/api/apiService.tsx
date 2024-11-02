// методы API тут - https://docs.tonconsole.com/tonapi/rest-api/accounts - вроде как самый верхний - getAccounts:


export const fetchBalance = async (accountId: string): Promise<number> => {
    try {
        const response = await fetch(`https://tonapi.io/v2/accounts/${accountId}`);
        const data = await response.json();
        console.log("Полученные данные:", data); // Лог данных из API
        return data.balance || 0; 
    } catch (error) {
        console.error("Ошибка при получении баланса:", error);
        return 0; //возвращаем 0 в случае ошибки
    }
};
