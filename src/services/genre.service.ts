
export class GenresService {


public checkData(value: string) {
    // Si el value es vacío o undefined entonces es false, en caso contrario true
    return (value === '' || value === undefined) ? false: true;
}

public helloService() {
}
}

export default GenresService;
