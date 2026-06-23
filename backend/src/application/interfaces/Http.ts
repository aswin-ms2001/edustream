export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?:any;

  user?:{
    id:string
  }
}

export interface HttpResponse {
  statusCode: number;
  body: any;    
}