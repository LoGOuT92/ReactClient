import axios from "axios";
import { Channel, diagram } from "../typings";
import { randomHexColor } from "../Components/UI/colorGenerator";

interface newItem{
    name: string;
    value: number;
}
interface ResponseData {
  message: string;
  channel: Channel;
}
interface CreateItemResponse {
  newDiagramItem: diagram;
  data: ResponseData;
}

export const editItem = async (id: number, value: number): Promise<Channel> => {
  const { data } = await axios.put<Channel>(
    `http://localhost/my-site/public/api/channels/${id}`,
    {
      value: value,
    }
  );
  return data;
};
export const createItem = async (newItem: newItem): Promise<CreateItemResponse> => {
  const { data } = await axios.post<ResponseData>(
    "http://localhost/my-site/public/api/channels",
    newItem
  );

      
  const newDiagramItem: diagram = {
    id: data.channel.id,
    title: data.channel.name,
    value: data.channel.value,
    color: randomHexColor(),
  };
  return { newDiagramItem, data };
};

export const deleteItem = async(id:number):Promise<{
  data: Channel;
}>=>{
    const { data } = await axios.delete<Channel>(
        `http://localhost/my-site/public/api/channels/${id}`
      );

      return {data}
}
export const getItems = async():Promise<{
  data: {
      channels: Channel[];
  };
}>=>{
    const { data } = await axios.get<{channels:Channel[]}>(
        "http://localhost/my-site/public/api/channels"
      );
    
      return {data}
}