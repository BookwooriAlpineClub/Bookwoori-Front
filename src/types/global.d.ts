declare type ElementOfArray<T> = T extends (infer U)[] ? U : T;
