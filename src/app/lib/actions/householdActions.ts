'use server';

export const getHousehold = async (id: string) => {
    try {
      const response = await fetch(`${process.env.APP_URL}/api/household/?id=${id}`);
      const household = await response.json();
      return household;
    } catch (e) {
      console.log(e);
    }
};

export const updateHousehold = async (id: string, name: string) => {
    try {
      const response = await fetch(`${process.env.APP_URL}/api/household/?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const household = await response.json();
        return household;
      }
    } catch (e) {
      console.log(e);
    }
  };