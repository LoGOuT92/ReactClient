import axios from "axios";
import { Channel, diagram } from "../typings";
import { randomHexColor } from "../Components/UI/colorGenerator";

const PATH = 'http://localhost:8080'

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
interface DeleteItemResponse {
  data: Channel;
}
interface GetItemsResponse {
  data: {
    channels: Channel[];
}
}

export const editItem = async (id: number, value: number): Promise<Channel> => {
  const { data } = await axios.put<Channel>(
    `${PATH}/api/channels/${id}`,
    {
      value: value,
    }
  );
  return data;
};
export const createItem = async (newItem: newItem): Promise<CreateItemResponse> => {
  const { data } = await axios.post<ResponseData>(
    `${PATH}/api/channels`,
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

export const deleteItem = async(id:number):Promise<DeleteItemResponse>=>{
    const { data } = await axios.delete<Channel>(
        `${PATH}/api/channels/${id}`
      );

      return {data}
}
export const getItems = async():Promise<GetItemsResponse>=>{
    const { data } = await axios.get<{channels:Channel[]}>(
        `${PATH}/api/channels`
      );
    
      return {data}
}